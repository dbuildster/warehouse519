import requests

# current and new API keys
current_key = 'need old key'
new_key = 'need new key'

# make request to API to update security key
response = requests.put('https://warehouse.azure-api.net/Warehouse/security_key', json={'current_key': current_key, 'new_key': new_key})

# check if request was successful
if response.status_code == 200:
    print('Security key updated successfully')
else:
    print(f'Error updating security key: {response.text}')