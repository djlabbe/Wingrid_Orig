import React, { Component } from 'react';

class RadioGroup extends Component {
  render() {
    const { input, meta, options } = this.props;
    const hasError = meta.touched && meta.error;

    return (
      <tr>
        {options.map(o => (
          <td key={o.value} className='game-cell'>
            <label>
              <input
                type='radio'
                {...input}
                value={o.value}
                checked={o.value === input.value}
                required={true}
              />{' '}
              {o.title}
            </label>
          </td>
        ))}
        {hasError && <span className='error'>{meta.error}</span>}
      </tr>
    );
  }
}

export default RadioGroup;
