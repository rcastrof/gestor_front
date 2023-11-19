import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
    marginBottom: 10,
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
});

const PDFFile = (props) => {
  const { sell, workers, products } = props;

  // Calcular el total general de productos
  const totalProductos = products.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    return total + productTotal;
  }, 0);

  // Calcular el total general de salarios de los trabajadores
  const totalSalarios = workers.reduce((total, worker) => {
    // Asegurarse de que `months` sea un número antes de multiplicar
    const months = typeof worker.months === 'number' ? worker.months : 0;
    const salarioTotal = worker.salary * months;
    return total + salarioTotal;
  }, 0);

  // Calcular el total general considerando los productos y salarios
  const totalGeneral = totalProductos + totalSalarios;

  // Formatear el total general a un string con 2 decimales
  //const totalGeneralFormateado = new Intl.NumberFormat('es-CL', {
  //  style: 'currency',
  //  currency: 'CLP',
  //}).format(totalGeneral);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe de Venta</Text>

          {/* Información del Cliente */}
          <View>
            <Text style={styles.subTitle1}>Cliente:</Text>
            <Text style={styles.content}>{sell.client.name}</Text>
          </View>

          {/* Tabla de Productos */}
          <View style={styles.tableContainer}>
            <Text style={styles.subTitle2}>Productos:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Producto</Text>
                <Text style={styles.tableCell}>Precio</Text>
                <Text style={styles.tableCell}>Cantidad</Text>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              {products.map((product, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{product.name}</Text>
                  <Text style={styles.tableCell}>{new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(product.price)}</Text>

                  <Text style={styles.tableCell2}>{product.quantity}</Text>
                  <Text style={styles.tableCell3}>{new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(product.price * product.quantity)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tabla de Trabajadores */}
          <View style={styles.tableContainerWorkers}>
            <Text style={styles.subTitle4}>Trabajadores:</Text>
            <View style={styles.tableWorkers}>
              <View style={styles.tableRowWorkers}>
                <Text style={styles.tableCellWorkers}>Profesión</Text>
                <Text style={styles.tableCellWorkers}>Salario</Text>
              </View>
              {workers.map((worker, index) => (
                <View key={index} style={styles.tableRowWorkers}>
                  <Text style={styles.tableCellWorkers}>{worker.profession}</Text>
                  <Text style={styles.tableCellWorkers}>{new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(worker.salary)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Total General */}
          <View>
          <Text style={styles.totalGeneral}>Total General: {totalGeneral}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
