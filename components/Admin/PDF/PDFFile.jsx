import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        height: 24,
        fontSize: 10,
    },
    tableCell: {
        padding: 5,
    },
});

const PDFFile = (props) => {
    const { sell, workers, products } = props;

    return (
        <Document>
            <Page size="A4">
                <View style={styles.container}>
                    <Text>Cliente: {sell.client.name}</Text>

                    {/* Tabla de Productos */}
                    <View style={styles.tableHeader}>
                        <Text>Productos</Text>
                    </View>
                    {products.map((product, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{product.name}</Text>
                            <Text style={styles.tableCell}>{product.price}</Text>
                            <Text style={styles.tableCell}>{product.quantity}</Text>
                        </View>
                    ))}

                    {/* Tabla de Trabajadores */}
                    <View style={styles.tableHeader}>
                        <Text>Trabajadores</Text>
                    </View>
                    {workers.map((worker, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{worker.profession}</Text>
                            <Text style={styles.tableCell}>{worker.salary}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default PDFFile;
