'use strict';

var h = require('../../../index').h;

var styles = require('../styles/styles.js');

var rafListen = require('../../lib/raf-listen.js');
var localStorage = window.localStorage;
var partial = require("vdom-thunk");
var TodoApp = require('./todo-app');

var Router = require('../../lib/router/index');

var routeView = Router.render;
var link = require('../partials/link.js');
var menu = require('./todo-list.js');
var renderTable = require('./todo-table');

module.exports = TodoComponent;

function TodoComponent(localStorageName) {
    var storedState = localStorage.getItem(localStorageName);
    var initialState = storedState ? JSON.parse(storedState) : null;

    var todoApp = TodoApp(initialState);

    rafListen(todoApp, function onChange(value) {
        localStorage.setItem(localStorageName,
            JSON.stringify(value));
    });

    return todoApp;
}

function renderBase() {
    return h('div', {
        className: 'welcome-todo'
    }, 'Welcome to ToDo list!');
}

TodoComponent.render = function(state, state2) {
    return h('div', {}, [
        h('aside.sidebar', {}, [
            partial(menu,state)
        ]),
        h('main', {
            style: {
                float: 'right',
                width: '60%'
            }
        }, [
            routeView({
                '/app': renderBase.bind(this),
                '/app/table1': renderTable.bind(this, state, 'List 1'),
                '/app/table2': renderTable.bind(this, state2, 'List 2'),
                '/app/table3': renderTable.bind(this, state, 'List 3')
            }, state)
        ])
    ]);
};