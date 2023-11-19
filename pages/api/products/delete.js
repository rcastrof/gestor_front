process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

export default async function handler(req, res) {
    const { id } = req.body;
    console.log(id);

    try {
        const response = await fetch(`https://localhost:7233/v1/producto/delete/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(`Request failed with status: ${response.status}`);
        }

        // Check if the response content type is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            // Handle non-JSON responses, such as an empty response or confirmation message
            console.log('Non-JSON Response:', await response.text());
            res.status(200).json({ message: 'Delete successful' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
