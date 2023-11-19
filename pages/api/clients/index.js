process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

export default async function handler(req, res) {
    try {
        const response = await fetch('https://localhost:7233/v1/cliente/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        res.statusCode = 200; // Establecer el código de estado directamente en res
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        console.log(error)
        res.statusCode = 500; // Establecer el código de estado directamente en res
        res.json({ error: 'Internal Server Error' });
    }
}
