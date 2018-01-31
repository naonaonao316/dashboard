import React from 'react';
import {
  Avatar,
  Divider,
  FontIcon,
  List,
  ListItem,
  Subheader,
} from 'react-md';

const InfoIcon = () => <FontIcon>info</FontIcon>;
const StarIcon = () => <FontIcon>star</FontIcon>;

const navItemLists = () => (
  <ListItem primaryText="Inbox" />
  <ListItem primaryText="Starred" />
  <ListItem primaryText="Sent Mail" />
  <ListItem primaryText="Drafts" />
);

export default navItemLists;
