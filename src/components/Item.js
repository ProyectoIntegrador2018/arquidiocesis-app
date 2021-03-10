import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default (props) => {
  var [loading, setLoading] = useState(false)

  var press = () => {
    if (!props.onPress) return
    props.onPress(function (d) {
      setLoading(d)
    })
  }

  return (
    <TouchableOpacity onPress={press}>
      <View style={[styles.item, props.style]}>
        <Text style={styles.itemText}>{props.text}</Text>
        {props.loading || loading ? (
          <ActivityIndicator size="small" style={{ marginRight: 30 }} />
        ) : (
          <FontAwesome5
            name="chevron-right"
            style={{ marginRight: 30, color: 'gray', fontSize: 15 }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
  },
  item: {
    paddingLeft: 15,
    paddingVertical: 15,
    width: '100%',
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
})
