import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as FlyBuyCore from 'react-native-bildit-flybuy-core';
import {Button, SectionTitle} from './components';

export const PlacesSection = () => {
  const [keyword, setKeyword] = useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState<FlyBuyCore.IPlace[]>(
    [],
  );
  const [selectedPlace, setSelectedPlace] = useState<FlyBuyCore.IPlace>();

  const suggestPlaces = useCallback(() => {
    FlyBuyCore.Places.suggest(keyword, {
      type: FlyBuyCore.PlaceType.CITY,
    })
      .then((places: FlyBuyCore.IPlace[]) => setSuggestedPlaces(places))
      .catch(err => console.log('err', err));
  }, [keyword]);

  useEffect(() => {
    suggestPlaces();
  }, [keyword, suggestPlaces]);

  const clearSuggestion = () => {
    setSuggestedPlaces([]);
    setKeyword('');
  };

  const handleSuggestedLocationPress = (place: FlyBuyCore.IPlace) => {
    clearSuggestion();
    setSelectedPlace(place);
    console.log('place', place)
    FlyBuyCore.Sites.fetchSitesNearPlace(place, 1000)
      .then(console.log)
      .catch(console.warn);
  };

  const handleRetrieveLocationPress = (place: FlyBuyCore.IPlace) => {
    clearSuggestion();
    setSelectedPlace(place);
    FlyBuyCore.Places.retrieve(place)
      .then(result =>
        Alert.alert(`Coordinate for ${place.name}`, JSON.stringify(result)),
      )
      .catch(console.warn);
  };

  return (
    <View style={styles.root}>
      <SectionTitle title="Places" />
      <TextInput
        placeholder="Type keyword"
        onChangeText={setKeyword}
        style={styles.input}
        value={keyword}
        onSubmitEditing={suggestPlaces}
        blurOnSubmit
      />
      {suggestedPlaces.map(item => (
        <View key={item.id} style={styles.suggestedPlace}>
          <Text>{`${item.name} - ${item.placeFormatted}`}</Text>
          <Text
            onPress={() => {
              handleSuggestedLocationPress(item);
            }}>
            Click to fetch sites near this location
          </Text>
          <Text
            onPress={() => {
              handleRetrieveLocationPress(item);
            }}>
            Retrieve Location
          </Text>
        </View>
      ))}
      <Button title="suggestPlace" onPress={suggestPlaces} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 8,
    minHeight: 44,
  },
  suggestedPlace: {
    margin: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
});
