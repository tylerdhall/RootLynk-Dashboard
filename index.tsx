import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import MyComponent from './API';

//render(<App />, document.getElementById('root'));
render(<MyComponent />, document.getElementById('root'))