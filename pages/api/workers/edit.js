process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL/TLS verification (not recommended)

export default async function handler(req, res) {

    const { data } = JSON.parse(req.body)
    const { id } = JSON.parse(req.body);

    console.log(id);
    console.log(data)

    try {
        const response = await fetch(`https://localhost:7233/v1/personal/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const contentType = response.headers.get('Content-Type');
        if (response.status === 204) {
            // Successful update with no content to return
        }
        if (contentType && contentType.includes('application/json')) {
            const datas = await response.json();
            res.status(200).json(datas);
        } else {
            console.log('Non-JSON Response:', await response.text());
            console.log('Full Response:', response);

            res.status(204).end();
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}