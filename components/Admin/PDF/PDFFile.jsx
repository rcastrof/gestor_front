import React, { useState } from 'react';
import cotizacionesData from '@public/data/cotizaciones.json';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  subTitle1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    left: 5,
  },
  subTitle3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle4: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
  tableContainer: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,  // Espacio después de la tabla
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    width: '25%',  // Ancho de la celda
  },
  tableCell2: {
    margin: 5,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    width: '25%',  // Ancho de la celda
  },
  tableCell3: {
    margin: 5,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    width: '25%',  // Ancho de la celda
  },
  tableContainerWorkers: {
    marginBottom: 20,
  },
  tableWorkers: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRowWorkers: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCellWorkers: {
    margin: 5,
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    width: '50%',  // Ancho de la celda
  },
  totalGeneral: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  //Numero Cotizacion
  mainTable: {
    display: 'table',
    width: '100%',
  },
  mainTableRow: {
    display: 'table-row',
  },
  mainTableCell: {
    display: 'table-cell',
  },
  mainTableCell2: {
    display: 'table-cell',
    alignItems: 'center',
  },
});

const PDFFile = (props) => {
    const { sell, workers, products } = props;

    const cotizaciones = cotizacionesData.sells;

    // Obtener el número de cotizaciones
    const numeroCotizaciones = cotizaciones.length;


    // Calcular el total de productos y salarios
    const totalProducts = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const totalSalaries = workers.reduce((acc, worker) => acc + worker.salary, 0);
    const grandTotal = totalProducts + totalSalaries;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.Container}>

                  {/* Logo Empresa */}
                  <View style={{ maxWidth: 100, height: 50, marginRight: 10 }}>
                    <Image source={require('/public/src/Logo.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                  </View>
                  {/* Numero de Cotizacion */}
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                      <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 'auto'}}>N° Cotizaciones:</Text>
                      <Text style={{fontSize: 14}}>{numeroCotizaciones}</Text>
                  </View>

                  <Text style={styles.title}>Cotización</Text>
                  {/* Informacion del CLiente */ }
                    <Text>Cliente: {sell.client.name}</Text>

                    {/* Tabla de Productos */}
                    <View style={styles.tableContainer}>
                        <Text style={styles.subTitle2}>Productos:</Text>
                        <View style={styles.table}>
                          <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>Producto</Text>
                            <Text style={styles.tableCell}>Precio</Text>
                            <Text style={styles.tableCell}>Cantidad</Text>
                            <Text style={styles.tableCell}>Valor</Text>
                          </View>
                        </View>
                    </View>
                    {products.map((product, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{product.name}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('es-CL', {
                              style: 'currency',
                              currency: 'CLP',
                            }).format(product.price)}</Text>
                            <Text style={styles.tableCell}>{product.quantity}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('es-Cl', {
                              style: 'currency',
                              currency: 'CLP'
                            }).format(product.price * product.quantity)}</Text>
                        </View>
                    ))}

                    {/* Tabla de Trabajadores */}
                    <View style={styles.tableContainerWorkers}>
                      <Text style={styles.subTitle4}>Trabajadores:</Text>
                    <View style={styles.tableWorkers}>
                    <View style={styles.tableRowWorkers}>
                      <Text style={styles.tableCellWorkers}>Profesión</Text>
                      <Text style={styles.tableCellWorkers}>Salario</Text>
                  </View>
                    {workers.map((worker, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{worker.profession}</Text>
                            <Text style={styles.tableCell}>{new Intl.NumberFormat('es-CL', {
                              style: 'currency',
                              currency: 'CLP',
                            }).format(worker.salary)}</Text>
                        </View>
                    ))}
                    </View>
                    </View>

                    {/* Totales */}
                    <View style={styles.totalRow}>
                        <Text>Total Productos: {new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            }).format(totalProducts)}</Text>
                        <Text>Total Salarios: {new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            }).format(totalSalaries)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Gran Total: {new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP',
                            }).format(grandTotal)}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFFile;
