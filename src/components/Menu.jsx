import React from 'react';
import PropTypes from 'prop-types';
import { matchSorter } from 'match-sorter';

const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Heading 1',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
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
    if (prevState.command !== command) {
      const items = matchSorter(allowedTags, command, { keys: ['tag'] });
      this.setState({ items });
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
        this.setState({ command: command + e.key });
        break;
    }
  }

  render() {
    const { items, selectedItemItem } = this.state;
    const { onSelect } = this.props;

    return (
      <div className="SelectMenu">
        <div className="Items">
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
                <div>
                  {item.label}
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
