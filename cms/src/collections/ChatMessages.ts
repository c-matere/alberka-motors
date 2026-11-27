import type { CollectionConfig } from 'payload'

const WA_BRIDGE_URL = process.env.WA_BRIDGE_URL || 'http://127.0.0.1:8001'

export const ChatMessages: CollectionConfig = {
  slug: 'chat-messages',
  admin: {
    useAsTitle: 'body',
    defaultColumns: ['sessionId', 'sender', 'senderName', 'body', 'vehicleName', 'createdAt'],
    group: 'Live Chat',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      const sessionFilter = (req.query?.where as Record<string, Record<string, unknown>> | undefined)?.sessionId?.equals
      if (typeof sessionFilter === 'string' && sessionFilter.length >= 16) {
        return {
          sessionId: {
            equals: sessionFilter,
          },
        }
      }
      return false
    },
    create: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc

        const nowIso = new Date().toISOString()
        const preview = String(doc.body || '').slice(0, 140)
        const nextStatus = doc.sender === 'agent' ? 'replied' : 'open'

        // Keep ChatSessions summary in sync without blocking message creation.
        try {
          const existing = await req.payload.find({
            collection: 'chat-sessions',
            where: { sessionId: { equals: doc.sessionId } },
            limit: 1,
          })
          if (existing.docs.length > 0) {
            const session = existing.docs[0]
            await req.payload.update({
              collection: 'chat-sessions',
              id: session.id,
              data: {
                visitorName:
                  doc.sender === 'visitor' && doc.senderName && doc.senderName !== 'Website Visitor'
                    ? doc.senderName
                    : session.visitorName,
                visitorPhone: doc.visitorPhone || session.visitorPhone,
                vehicleName: doc.vehicleName || session.vehicleName,
                status: nextStatus,
                lastMessageAt: nowIso,
                lastMessagePreview: preview,
              },
            })
          } else {
            await req.payload.create({
              collection: 'chat-sessions',
              data: {
                sessionId: doc.sessionId,
                visitorName: doc.sender === 'visitor' && doc.senderName ? doc.senderName : 'Website Visitor',
                visitorPhone: doc.visitorPhone || '',
                vehicleName: doc.vehicleName || '',
                status: nextStatus,
                lastMessageAt: nowIso,
                lastMessagePreview: preview,
              },
            })
          }
        } catch (err) {
          req.payload.logger.warn({ err }, 'Failed to sync chat-sessions summary')
        }

        // Forward visitor messages to Alberka WhatsApp bridge (best-effort, non-blocking).
        if (doc.sender === 'visitor') {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), 4500)
          fetch(`${WA_BRIDGE_URL}/api/site-chat/notify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              sessionId: doc.sessionId,
              messageId: doc.id,
              senderName: doc.senderName || 'Website Visitor',
              visitorPhone: doc.visitorPhone || '',
              vehicleName: doc.vehicleName || '',
              body: doc.body,
            }),
          })
            .catch((err) => {
              req.payload.logger.warn({ err }, 'WhatsApp site-chat notify failed')
            })
            .finally(() => clearTimeout(timer))
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'sender',
      type: 'select',
      required: true,
      options: [
        { label: 'Visitor', value: 'visitor' },
        { label: 'Agent', value: 'agent' },
        { label: 'System', value: 'system' },
      ],
      defaultValue: 'visitor',
    },
    {
      name: 'senderName',
      type: 'text',
      defaultValue: 'Website Visitor',
    },
    {
      name: 'visitorPhone',
      type: 'text',
    },
    {
      name: 'vehicleName',
      type: 'text',
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'waMessageId',
      type: 'text',
    },
  ],
}
