import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import ibge from '../../services/ibge';

import Dropdown from '../../components/Dropdown';

const logo = '../../assets/logo.png';
const background = '../../assets/home-background.png';

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    ibge.getUfs().then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;
    ibge.getCities(selectedUf).then((response) => {
      const cityNames = response.data.map((city) => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points');
  }

  return (
    <ImageBackground
      source={require(background)}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require(logo)} />
        <Text style={styles.title}>Your waste collection marketplace.</Text>
        <Text style={styles.description}>
          We help people to find waste collection points efficiently.
        </Text>
      </View>

      <View style={styles.footer}>
        <Dropdown
          style={dropdownStyles}
          options={ufs.map((uf) => {
            return { label: uf, value: uf };
          })}
          onChange={setSelectedUf}
          placeholder="Select a state..."
        ></Dropdown>
        <Dropdown
          style={dropdownStyles}
          options={cities.map((city) => {
            return { label: city, value: city };
          })}
          onChange={setSelectedCity}
          placeholder="Select a city..."
        ></Dropdown>

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24}></Icon>
            </Text>
          </View>
          <Text style={styles.buttonText}>Enter</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const dropdownStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;
