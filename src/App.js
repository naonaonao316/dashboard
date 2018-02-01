import React, { PureComponent, Component } from 'react';
import {
  Button,
  Drawer,
  Toolbar,
  DialogContainer,
  NavigationDrawer,
  SVGIcon,
  List,
  ListItem,
  FontIcon
} from 'react-md';
import inboxListItems from './constants/inboxListItems';

// import './css/_styles.scss';

import logo from './logo.svg';
import './App.css';

class SimpleDrawer extends PureComponent {
  state = { visible: false, position: 'left' };

  openDrawerLeft = () => {
    this.setState({ visible: true, position: 'left' });
  };

  closeDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {

    const { visible, position } = this.state;
    const closeBtn = <Button icon onClick={this.closeDrawer}>{'arrow_back'}</Button>;

    return (
      <div>
        <Button raised onClick={this.openDrawerLeft}>
          Open Drawer Left
        </Button>
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          position={position}
          onVisibilityChange={this.handleVisibility}
          navItems={inboxListItems}
        />
      </div>
    );
  }
}

class Dialog extends PureComponent {
  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  handleKeyDown = (e) => {
    const key = e.which || e.keyCode;
    if (key === 13 || key === 32) {
      // also close on enter or space keys
      this.hide();
    }
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button raised onClick={this.show}>Open the dialog</Button>
        <DialogContainer
          id="simple-list-dialog"
          visible={visible}
          title="Simple List Dialog"
          onHide={this.hide}
        >
          <List onClick={this.hide} onKeyDown={this.handleKeyDown}>
            <ListItem primaryText="Single line text goes here" />
            <ListItem primaryText="Two line wrapped text goes here making it wrap to the next line" />
            <ListItem primaryText="Single line text goes here" />
            <ListItem primaryText="Three line wrapped text goes here making it wrap to the next line and continues longer to be here" />
          </List>
        </DialogContainer>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      <div>
        <Dialog />
        <SimpleDrawer />
      </div>
    )
  }
}

export default App;
