'use strict';

var hg = require('../../../../index.js');
var h = require('../../../../index.js').h;
var styles = require('../../styles/styles.js');

var validEmail = require('valid-email');

var WeakmapEvent = require('../../../lib/weakmap-event.js');
var onSuccess = WeakmapEvent();
Login.onSuccess = onSuccess.listen;

var inputField = require('../../partials/input-field.js');
var resetErrors = require('../../partials/reset-errors.js');

module.exports = Login;

function Login(state, user) {
    resetErrors(state);
    var email = user.email;

    if (!validEmail(email)) {
        return state.emailError.set('Invalid email');
    }

    onSuccess.broadcast(state);
}

Login.render = function (state) {
    var channels = state.channels;

    return h('div', {
        'ev-event': hg.sendSubmit(channels.login)
    }, [
        h('div', {
          className: 'login-box'
        },[
            h('form', {
                className: 'email-login'
            }, [
                inputField({
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email',
                    required: 'required',
                    error: state.emailError
                }),
                inputField({
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password',
                    required: 'required',
                    error: state.passwordError
                }),
                h('div', {
                    className: 'u-form-group'
                }, [
                    h('button', 'Log in')
                ])
            ]),
            h('div', {
                className: 'u-form-group'
            }, [
                h('a', {
                    'ev-click': hg.send(channels.switchMode,
                        !state.registerMode)
                }, 'Sign Up')
            ])
        ])
    ]);
};

