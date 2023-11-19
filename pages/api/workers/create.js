process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

export default async function handler(req, res) {

    const { data } = JSON.parse(req.body)

    console.log(data)

    try {
        const response = await fetch(`https://localhost:7233/v1/personal/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const datas = await response.json();
            res.status(200).json(datas);
        } else {
            console.log('Non-JSON Response:', await response.text());
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}