import React from 'react';
import PropTypes from 'prop-types';
import { matchSorter } from 'match-sorter';
import '../styling/Menu.scss';

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
      selectedItemItem: 0,
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
      onSelect,
    } = this.state;

    const { close } = this.props;

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
        this.setState({ selectedItemItem: prevselectedItem });
        break;
      }
      case 'ArrowDown':
      case 'Tab': {
        e.preventDefault();
        const nextselectedItem = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
        this.setState({ selectedItemItem: nextselectedItem });
        break;
      }
      default:
        this.setState({ command: command + e.key, selectedItem: 0 });
        break;
    }
  }

  render() {
    const { items, selectedItemItem, command } = this.state;
    const { onSelect } = this.props;

    return (
      <div className="SelectMenu">
        <h2>Add blocks</h2>
        <p className="keep">Keep typing to filter, or escape to exit</p>
        <p className="filter">
          Filtering keyword
          {' '}
          {command && command !== 'Shift' && command !== 'CapsLock' && (
            <span id="filterId">{command}</span>
          )}
        </p>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="Items"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSelect(items[selectedItemItem].tag);
            }
          }}
        >
          {items.map((item) => {
            const isselectedItem = items.indexOf(item) === selectedItemItem;
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
};

export default SelectMenu;
