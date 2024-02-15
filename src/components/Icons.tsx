/* eslint-disable prettier/prettier */
import React from 'react';
import type {PropsWithChildren} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

//Defining a prop type
type IconsProps = PropsWithChildren<{
  name: string;
}>;

//Rendering sticker on basis of prop passed into it
const Icons = ({name}: IconsProps) => {
  if (name === 'circle') {
    return <Icon name="circle-thin" size={38} color="#A3CB38" />;
  } else if (name === 'cross') {
    return <Icon name="times" size={38} color="#ff4757" />;
  } else {
    return <Icon name="pencil" size={38} color="#57606f" />;
  }
};

export default Icons;
