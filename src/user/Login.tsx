import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import {
  TextField,
  Checkbox,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";

import "./Login.css";

import { UserService } from "../services/user";
import { AppBar } from "../common/AppBar";

interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

type LoginFormKeys = keyof LoginForm;

interface LoginState extends LoginForm {
  process: boolean;
  error: object | string | undefined;
}

type OnInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type InputEventValueGetter<K extends keyof LoginForm> = (
  event: React.ChangeEvent<HTMLInputElement>
) => LoginForm[K];

class Login extends React.Component<RouteComponentProps, LoginState> {
  private onInputHandlers: {
    [key in LoginFormKeys]: OnInputHandler;
  };

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: false,
      process: false,
      error: undefined
    };

    function generateHandler<K extends LoginFormKeys>(
      _this: Login,
      key: K,
      getter: InputEventValueGetter<K>
    ): OnInputHandler {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        _this.setState({
          [key]: getter(event)
        } as any);
      };
    }

    this.onInputHandlers = {
      username: generateHandler(this, "username", e => e.target.value),
      password: generateHandler(this, "password", e => e.target.value),
      rememberMe: generateHandler(this, "rememberMe", e => e.target.checked)
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event: React.SyntheticEvent) {
    this.setState({
      process: true
    });
    UserService.getInstance()
      .login(
        {
          username: this.state.username,
          password: this.state.password
        },
        this.state.rememberMe
      )
      .then(
        _ => {
          this.props.history.goBack();
        },
        e => {
          this.setState({
            error: e,
            process: false
          });
        }
      );
    event.preventDefault();
  }

  render(): React.ReactNode {
    return (
      <div>
        <AppBar user={null} />
        <div className="login-page">
          <Typography className="login-welcome" variant="h4">
            Welcome to Timeline!
          </Typography>
          <form className="login-form">
            <div className="login-body">
              <TextField
                label="username"
                disabled={this.state.process}
                onChange={this.onInputHandlers.username}
                value={this.state.username}
                fullWidth
              />
              <TextField
                label="password"
                disabled={this.state.process}
                type="password"
                onChange={this.onInputHandlers.password}
                value={this.state.password}
                fullWidth
              />
              <div className="login-rememberme-box">
                <Checkbox
                  id="rememberMe"
                  onChange={this.onInputHandlers.rememberMe}
                  disabled={this.state.process}
                />
                <label htmlFor="rememberMe">Remember me!</label>
              </div>
              {this.state.error ? (
                <div className="login-error-message">
                  {this.state.error.toString()}
                </div>
              ) : null}
              <div className="login-submit-box">
                {this.state.process ? (
                  <CircularProgress size={50} />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
