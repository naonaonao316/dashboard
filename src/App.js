import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {
  Button,
  Drawer,
  Toolbar,
  DialogContainer,
  NavigationDrawer,
  SVGIcon,
  List,
  ListItem,
  FontIcon,
  bem
} from 'react-md';

// Those files will be needed for navigation bar
// import navItems from './constants/navItems';
// import Link from './components/Link';
import menu from './icons/menu.svg';
import arrowBack from './icons/arrow_back.svg';
import inboxListItems from './constants/inboxListItems';

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
  state = { visible: true };

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

const Floating = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button floating>home</Button>
    <Button floating primary>share</Button>
    <Button floating secondary iconClassName="fa fa-star-o" />
    <h5>Mini Examples</h5>
    <Button floating mini>home</Button>
    <Button floating primary mini>share</Button>
    <Button floating secondary iconClassName="fa fa-star-o" mini />
    <h5>Disabled Examples</h5>
    <Button floating primary disabled>favorite</Button>
    <Button floating secondary disabled>close</Button>
    <h5>Theme Swapped Examples</h5>
    <Button floating primary swapTheming>favorite</Button>
    <Button floating secondary swapTheming>favorite</Button>
  </div>
);

class Simple extends PureComponent {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = inboxListItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.setPage(item.key, item.primaryText),
      };
    });

    this.state = {
      renderNode: null,
      visible: true,
      key: inboxListItems[0].key,
      page: inboxListItems[0].primaryText,
    };
  }

  setPage = (key, page) => {
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return { ...item, active: item.key === key };
    });

    this.setState({ key, page });
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false, renderNode: null });
  };

  handleShow = () => {
    this.setState({ renderNode: document.getElementById('navigation-drawer-demo') });
  };

  render() {
    const { visible, page, renderNode } = this.state;
    return (
      <div>
        <Button raised onClick={this.show}>Open the Demo</Button>
        <DialogContainer
          id="navigation-drawer-demo"
          aria-label="Navigation Drawer Demo"
          visible={visible}
          fullPage
          focusOnMount={false}
          onShow={this.handleShow}
          onHide={this.hide}
        >
          <NavigationDrawer
            renderNode={renderNode}
            navItems={this.navItems}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            toolbarTitle="SSG DashBoard"
            contentId="main-demo-content"
            temporaryIcon={<SVGIcon use={menu.url} />}
            persistentIcon={<SVGIcon use={arrowBack.url} />}
            contentClassName="md-grid"
          >
            <h2 className="md-cell md-cell--12">Currently on page: {page}</h2>
            <section className="md-text-container md-cell md-cell--12">
              <p>The content will be displayed here</p>
              <Floating />
            </section>
          </NavigationDrawer>
        </DialogContainer>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      <div>
        <Simple />
        <Floating />
      </div>
    )
  }
}

export default App;
