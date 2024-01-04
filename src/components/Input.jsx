import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import SelectMenu from './Menu';
import '../styling/App.scss';
import { getCaretCoordinates, setCaretToEnd } from './function/caretHelpers';
import hum from '../assets/hum.png';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: '',
      tag: 'p',
      previousKey: '',
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    const { html, tag } = this.props;
    this.setState({ html, tag });
  }

  componentDidUpdate(prevState) {
    const {
      html,
      tag,
    } = this.state;
    const htmlChanged = prevState.html !== html;
    const tagChanged = prevState.tag !== tag;

    if (htmlChanged || tagChanged) {
      const { updatePage, id } = this.props;
      updatePage({
        id,
        html,
        tag,
      });
    }
  }

  onChangeHandler(e) {
    this.setState({ html: e.target.value });
  }

  onKeyDownHandler(e) {
    if (e.key === '/') {
      const { html } = this.state;
      this.setState({ htmlBackup: html });
    }
    if (e.key === 'Enter') {
      const { previousKey, selectMenuIsOpen } = this.state;
      if (previousKey !== 'Shift' && !selectMenuIsOpen) {
        const { addInput, id } = this.props;
        e.preventDefault();
        addInput({
          id,
          ref: this.contentEditable.current,
        });
      }
    }

    const { html } = this.state;
    const { deleteInput, id } = this.props;
    if (e.key === 'Backspace' && !html) {
      e.preventDefault();
      deleteInput({
        id,
        ref: this.contentEditable.current,
      });
    }
    this.setState({ previousKey: e.key });
  }

  onKeyUpHandler(e) {
    if (e.key === '/') {
      this.openSelectMenuHandler();
    }
  }

  openSelectMenuHandler() {
    const { x, y } = getCaretCoordinates();
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
    document.addEventListener('click', this.closeSelectMenuHandler);
  }

  closeSelectMenuHandler() {
    this.setState({
      htmlBackup: null,
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null },
    });
    document.removeEventListener('click', this.closeSelectMenuHandler);
  }

  tagSelectionHandler(tag) {
    const { htmlBackup } = this.state;
    this.setState({ tag, html: htmlBackup }, () => {
      setCaretToEnd(this.contentEditable.current);
      this.closeSelectMenuHandler();
    });
  }

  render() {
    const {
      selectMenuIsOpen,
      selectMenuPosition,
      html,
      tag,
    } = this.state;
    const { placeholder } = this.props;

    const resetIcon = tag === 'h1' && html && ( // Condition pour afficher l'icône de réinitialisation
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className="reset-icon"
        onClick={() => {
          this.setState({ html: '', tag: 'p' });
        }}
      >
        <img src={hum} alt="hum" className="hum" />
      </div>
    );

    return (
      <>
        {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            close={this.closeSelectMenuHandler}
          />
        )}

        <div className="contentE">
          <span>{tag === 'h1' && html !== '' && resetIcon}</span>
          <ContentEditable
            className="Input"
            placeholder={placeholder}
            html={html}
            tagName={tag}
            innerRef={this.contentEditable}
            onChange={this.onChangeHandler}
            onKeyDown={this.onKeyDownHandler}
            onKeyUp={this.onKeyUpHandler}
          />
        </div>
      </>
    );
  }
}

Input.propTypes = {
  addInput: PropTypes.func.isRequired,
  deleteInput: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
