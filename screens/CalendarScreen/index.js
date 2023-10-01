import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

// Layout
import Layout from "../../components/Layout";

// Calendar
import { CalendarList, LocaleConfig } from "react-native-calendars";

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});

  // Función para marcar una fecha específica
  const markDate = (date) => {
    const updatedMarkedDates = {
      ...markedDates,
      [date]: { selected: true, marked: true },
    };
    setMarkedDates(updatedMarkedDates);
  };

  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "En.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ag.",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Miér.", "Juev.", "Vier.", "Sáb."],
    today: "Hoy",
  };

  LocaleConfig.defaultLocale = "es";
  return (
    <Layout>
      <CalendarList
        style={styles.Calendar}
        markedDates={markedDates} // Pasar el objeto de fechas marcadas
        onDayPress={(day) => markDate(day.dateString)} // Manejar la selección de una fecha
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  Calendar: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default CalendarScreen;
