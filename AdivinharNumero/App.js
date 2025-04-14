import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const MAX_TENTATIVAS = 5;

  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumero());
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  function gerarNumero() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const verificarPalpite = () => {
    const numero = parseInt(palpite);
    if (isNaN(numero)) {
      setMensagem('ERRO: Insira dados numéricos');
      return;
    }

    Keyboard.dismiss();
    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (numero === numeroSecreto) {
      setMensagem(`ACESSO CONCEDIDO! Código ${numeroSecreto} confirmado`);
      setJogoFinalizado(true);
    } else if (novasTentativas >= MAX_TENTATIVAS) {
      setMensagem(`SISTEMA BLOQUEADO! Código correto: ${numeroSecreto}`);
      setJogoFinalizado(true);
    } else if (numero < numeroSecreto) {
      setMensagem('NÍVEL DE ACESSO INSUFICIENTE');
    } else {
      setMensagem('NÍVEL DE ACESSO EXCEDIDO');
    }

    setPalpite('');
  };

  const reiniciarJogo = () => {
    setNumeroSecreto(gerarNumero());
    setPalpite('');
    setMensagem('');
    setTentativas(0);
    setJogoFinalizado(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>GALLO GUESS</Text>
        <View style={styles.terminalLine} />
      </View>

      <Text style={styles.subtitulo}>
        DECIFRE O CÓDIGO (1-100)
      </Text>

      <View style={styles.terminalBox}>
        <Text style={styles.tentativas}>
          TENTATIVAS: {MAX_TENTATIVAS - tentativas}/{MAX_TENTATIVAS}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="INSIRA O CÓDIGO..."
          placeholderTextColor="#00ff9d"
          value={palpite}
          onChangeText={setPalpite}
          editable={!jogoFinalizado}
        />
        <View style={styles.inputGlow} />
      </View>

      <View style={styles.botoes}>
        <Pressable
          style={[styles.botao, jogoFinalizado && styles.botaoDesativado]}
          onPress={verificarPalpite}
          disabled={jogoFinalizado}
        >
          <Text style={styles.botaoTexto}>VERIFICAR</Text>
          <View style={styles.botaoGlow} />
        </Pressable>

        <Pressable 
          style={styles.botaoReiniciar} 
          onPress={reiniciarJogo}
        >
          <Text style={styles.botaoTexto}>REINICIAR</Text>
          <View style={styles.botaoGlow} />
        </Pressable>
      </View>

      <Text
        style={[
          styles.resultado,
          numeroSecreto === parseInt(palpite) && styles.resultadoSucesso,
          tentativas >= MAX_TENTATIVAS && styles.resultadoErro
        ]}
      >
        {mensagem || "AGUARDANDO INPUT..."}
      </Text>

      <View style={styles.footer}>
        <View style={styles.scanLine} />
        <Text style={styles.footerText}>SISTEMA DE SEGURANÇA v2.4.7</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a12',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00ff9d',
    letterSpacing: 5,
    marginBottom: 8,
    textShadowColor: '#00ff9d',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  terminalLine: {
    height: 2,
    width: screenWidth * 0.7,
    backgroundColor: '#00ff9d',
    shadowColor: '#00ff9d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#00b4ff',
    marginBottom: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  terminalBox: {
    borderWidth: 1,
    borderColor: '#00ff9d',
    padding: 15,
    marginBottom: 30,
    backgroundColor: 'rgba(0, 255, 157, 0.05)',
  },
  tentativas: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ff9d',
    letterSpacing: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 30,
    width: screenWidth * 0.8,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#00ff9d',
    borderWidth: 1,
    borderColor: '#00ff9d',
    borderRadius: 0,
    padding: 15,
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  inputGlow: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff9d',
    shadowColor: '#00ff9d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    zIndex: -1,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  botao: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#00b4ff',
    borderRadius: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  botaoReiniciar: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#ff006a',
    borderRadius: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  botaoDesativado: {
    borderColor: '#555',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    position: 'relative',
    zIndex: 1,
  },
  botaoGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 180, 255, 0.2)',
  },
  resultado: {
    marginTop: 20,
    fontSize: 16,
    color: '#00b4ff',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: 'monospace',
    minHeight: 50,
    textShadowColor: 'rgba(0, 180, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  resultadoSucesso: {
    color: '#00ff9d',
    textShadowColor: 'rgba(0, 255, 157, 0.5)',
  },
  resultadoErro: {
    color: '#ff006a',
    textShadowColor: 'rgba(255, 0, 106, 0.5)',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  scanLine: {
    height: 1,
    width: screenWidth * 0.6,
    backgroundColor: '#00ff9d',
    marginBottom: 10,
    shadowColor: '#00ff9d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  footerText: {
    fontSize: 10,
    color: 'rgba(0, 180, 255, 0.7)',
    letterSpacing: 1,
  },
});