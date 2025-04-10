import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [bitcoin, setBitcoin] = useState(null);
  const [dolar, setDolar] = useState(null);
  const [textButton, setTextButton] = useState("Converter");
  const [message, setMessage] = useState("Digite o valor em Bitcoin");
  // Taxa de câmbio atualizada (1 BTC = 81,212 USD em junho/2024) FEITO PELO DEEPSEEK
  const [exchangeRate, setExchangeRate] = useState(81212); 

  function formatCurrency(value) {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function convertToDolar() {
    if (!bitcoin) return;
    const dolarValue = bitcoin * exchangeRate;
    setDolar(formatCurrency(dolarValue));
  }

  function validateConversion() {
    if (bitcoin != null) {
      Keyboard.dismiss();
      convertToDolar();
      setBitcoin(null);
      setTextButton("Conversão");
      setMessage("Valor Convertido US$:");
      return;
    }
    setDolar(null);
    setTextButton("Converter");
    setMessage("Digite o valor em Bitcoin");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>Conversor Bitcoin  Dólar</Text>
      </View>
    
      <View style={styles.content}> 
        <Text style={styles.subTitle}>Cotação Atual: 1 BTC = ${formatCurrency(exchangeRate)}</Text>

        <View>
          <Text style={styles.label}>Quantidade de Bitcoin (BTC)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBitcoin}
            value={bitcoin ?? ''}
            placeholder='Ex: 0.5'
            keyboardType='numeric'
          />
        </View>

        <View style={{ marginTop: 25 }}>
          <Text style={styles.label}>Alterar Taxa (1 BTC = USD)</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setExchangeRate(parseFloat(text) || 81212)}
            value={String(exchangeRate)}
            placeholder='Ex: 81212'
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={validateConversion}
        >
          <Ionicons name="cash-outline" size={24} color='#000000'/>
          <Text style={styles.text}>{textButton}</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{message}</Text>
          {dolar && <Text style={styles.resultValue}>${dolar}</Text>}
        </View>

      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 120,
    backgroundColor: '#FF9500',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  titleText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 30,
    width: '100%',
    backgroundColor: '#edf2f4',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 30,
    color: '#555',
  }, 
  label: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    fontSize: 16,
    borderColor: '#FF9500',
    borderWidth: 2,
    marginVertical: 5, 
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20,
    elevation: 3,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 42,
    color: '#FF9500',
    fontWeight: 'bold',
    marginTop: 10,
  }
});