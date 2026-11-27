import type { CollectionConfig } from 'payload'

export const ChatSessions: CollectionConfig = {
  slug: 'chat-sessions',
  admin: {
    useAsTitle: 'visitorName',
    defaultColumns: ['sessionId', 'visitorName', 'visitorPhone', 'vehicleName', 'status', 'lastMessageAt'],
    group: 'Live Chat',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'visitorName',
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
      name: 'vehicleStockNo',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
    },
    {
      name: 'lastMessageAt',
      type: 'date',
    },
    {
      name: 'lastMessagePreview',
      type: 'text',
    },
  ],
}
