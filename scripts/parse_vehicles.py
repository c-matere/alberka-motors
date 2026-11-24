with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as vf:
    lines = vf.readlines()

in_vehicles = False
current_vehicle = {}
vehicles = []

for line in lines:
    if 'export const VEHICLES: Vehicle[] =' in line:
        in_vehicles = True
        continue
    if in_vehicles:
        if line.strip() == '];':
            break
        # Top-level vehicle starts with '  {'
        if line.startswith('  {') and not line.startswith('    {'):
            if current_vehicle:
                vehicles.append(current_vehicle)
            current_vehicle = {}
        for key in ['id', 'name', 'year', 'heroImage', 'stockNo']:
            stripped = line.strip()
            if stripped.startswith(f'{key}:'):
                val = stripped.split(':', 1)[1].strip().strip("',\"")
                current_vehicle[key] = val

if current_vehicle:
    vehicles.append(current_vehicle)

print(f"Found {len(vehicles)} top-level vehicles:")
for v in vehicles:
    print(v)
