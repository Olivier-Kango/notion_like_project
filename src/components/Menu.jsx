import React from 'react';
import PropTypes from 'prop-types';
import { matchSorter } from 'match-sorter';
import '../styling/Menu.scss';

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Heading 1',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Expandable Heading 1',
  },
];

class SelectMenu extends React.Component {
  constructor(props) {
    super(props);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.state = {
      command: '',
      items: allowedTags,
      selectedItem: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
  }

  componentDidUpdate(prevProps, prevState) {
    const { command } = this.state;
    const filteredItems = matchSorter(allowedTags, command, { keys: ['tag'] });
    const newItems = filteredItems.length > 0 ? filteredItems : allowedTags;
    if (prevState.command !== command) {
      this.setState({ items: newItems });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler(e) {
    const {
      items,
      command,
      selectedItem,
    } = this.state;

    const { close, onSelect } = this.props;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onSelect(items[selectedItem].tag);
        break;
      case 'Backspace':
        if (!command) close();
        this.setState({ command: command.substring(0, command.length - 1) });
        break;
      case 'ArrowUp': {
        e.preventDefault();
        const prevselectedItem = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
        this.setState({ selectedItem: prevselectedItem });
        break;
      }
      case 'ArrowDown':
      case 'Tab': {
        e.preventDefault();
        const nextselectedItem = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
        this.setState({ selectedItem: nextselectedItem });
        break;
      }
      default:
        this.setState({ command: command + e.key, selectedItem: 0 });
        break;
    }
  }

  render() {
    const { items, selectedItem, command } = this.state;
    const { onSelect } = this.props;
    const { position: { x, y: originalY } } = this.props;
    const y = originalY - MENU_HEIGHT;
    const positionAttributes = { top: y, left: x };

    return (
      <div className="SelectMenu" style={positionAttributes}>
        <h2>Add blocks</h2>
        <p className="keep">Keep typing to filter, or escape to exit</p>
        <p className="filter">
          Filtering keyword
          {' '}
          {command && command !== 'Shift' && command !== 'CapsLock' && (
            <span id="filterId">{command}</span>
          )}
        </p>
        <div className="Items">
          {items.map((item) => {
            const isselectedItem = items.indexOf(item) === selectedItem;
            return (
              <div
                className={isselectedItem ? 'selectedItem' : null}
                key={item.id}
                role="button"
                tabIndex="0"
                onClick={() => onSelect(item.tag)}
                onKeyDown={() => onSelect(item.tag)}
              >
                <div className="T">T</div>
                <div className="container-label">
                  <div className="label">
                    {item.label}
                  </div>
                  <div className="descr">
                    {item.id === 'page-title' ? <p>Shortcut: type # + space</p> : (
                      <p>
                        {'Shortcut: type >># + space'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

SelectMenu.propTypes = {
  close: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default SelectMenu;
