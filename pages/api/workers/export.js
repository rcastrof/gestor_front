import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://localhost:7233/v1/personal/export', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Agrega cualquier encabezado adicional que necesites, como tokens de autorización, si es necesario
            },
            // Puedes agregar más opciones aquí, como body si estás enviando datos en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        // Verificar si la respuesta es un archivo binario (como un archivo Excel)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            // Si es un archivo Excel, configurar los encabezados y enviar el archivo binario directamente
            res.setHeader('Content-Disposition', 'attachment; filename="Product.xlsx"');
            res.setHeader('Content-Type', contentType);
            const buffer = await response.buffer();
            res.send(buffer);
        } else {
            // Si no es un archivo Excel, interpretar la respuesta como JSON
            const data = await response.json();
            res.status(200).json(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
