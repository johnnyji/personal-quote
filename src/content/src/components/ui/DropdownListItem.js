import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {ListItem} from 'material-ui/List';
import pureRender from 'pure-render-decorator';

@pureRender
export default class DropdownListItem extends Component {

  static displayName = 'DropdownListItem';

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    style: PropTypes.object
  };
  
  render() {
    return (
      <ListItem
        disabled={this.props.disabled}
        onClick={this._handleSelectItem}
        style={this.props.style}>
        {this.props.children}
      </ListItem>
    );
  }

  _handleSelectItem = () => {
    return this.props.onSelect(this.props.value);
  };

}
