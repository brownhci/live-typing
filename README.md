# live-typing

Interaction rich indicators for text-based communication

## Description

This package consists of the design and implementation of four typing indicators that can be incorporated in web or messaging platforms such as Discord, Slack, or Reddit. It works for input as well as text area elements. First, there are two typing interfaces that currently exist in SMS and IM applications:


* No-indicator: displays no cues (or a lack of typing indicator) when someone is typing.
* Is-typing: this typing interface displays when the other person is typing through three dots `...`

Next, there are two new indicators that this library includes for message transparency:

* Masked-typing: typing is concealed and displayed as # characters. The actual characters are revealed once it is sent.
* Live-typing: typed characters are displayed in real-time.


## Features

* Real time typing indicators based on the concepts of Media Richness Theory (MRT)
* Allows user customisation for interaction-rich communication
* Easy to integrate

## Installation

### Build the repository 

You can build the repository from the source by following these instructions

```
# Download Node: https://nodejs.org/en/download/
git clone https://github.com/brownhci/live-typing.git
cd live-typing
npm install
```

### Integrate in any modern framework

To use this package in your application, install Node, and run the following command in the terminal:

```
npm i live-typing
```

In your code, you can import using

```
import { typingIndicator } from 'live-typing';
```

## Customization

By default, the typing indicator is set to ... (is-typing). The timeout is set to 5000ms. The indicators are linked with the following key values:

```
No-indicator: 1
Is-typing indicator: 2
Live-typing: 3
Masked-typing: 4
```

## How to use

The ```typingIndicator``` is a custom function of the package ```live-typing``` that creates a typing indicator which can display the typing state of an input field. The function takes an object with two properties: timeout which determines how long to wait before assuming that the user has stopped typing, and indicatorType which specifies the type of typing indicator to use.

In this example, we set the timout to 500ms and choose the Masked Typing indicator.

```
const [isTyping, typedCharacter, responseElement] = typingIndicator({
    timeout: 500,
    indicatorType: 4,
  });
```

The ```typingIndicator``` function returns an array with three elements:

```isTyping```: a boolean value that indicates whether the user is currently typing or not.
```typedCharacter```: a string that represents the character(s) typed by the user since the last keystroke event. This will vary depending on the typing indicator you specify in the function call.
```responseElement```: an HTML element that can be used to display the typing indicator in the UI.

The ```responseElement``` is usually added to the DOM to display the typing indicator in the user interface. If you're creating a messaging application, this will be used by the server to send to the recipient client.

## Publications

@inproceedings{papoutsaki2018eye,
author={Iftikhar, Zainab and Yumeng, Ma and Huang, Jeff},
title={``Together but not together”: Evaluating Typing Indicators for
Interaction-Rich Communication},
booktitle={Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems},
pages={},
year={2023},
organization={ACM}
}