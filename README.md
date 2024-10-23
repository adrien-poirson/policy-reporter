# Finite State Machine Visualizer

This project is a React-based application that visualizes a Finite State Machine (FSM) (using npom package fsm-generator) for calculating the remainder when dividing a binary number by 3. It includes a mod-three calculator and an FSM visualization.

## Features

-   Convert binary numbers to decimal
-   Calculate the remainder when dividing by 3
-   Visualize the FSM for the mod-three calculation
-   FSM diagram
-   Unit tests and end-to-end tests

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (v14 or later)
-   Yarn package manager

## Installation

To install the Finite State Machine Visualizer, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/your-username/finite-state-machine.git
    ```
2. Navigate to the project directory:
    ```
    cd finite-state-machine
    ```
3. Install the dependencies:
    ```
    yarn install
    ```

## Usage

To run the application locally:

1. Start the development server:
    ```
    yarn dev
    ```
2. Open your browser and visit `http://localhost:5173`

## Running Tests

This project uses Jest for unit tests and Playwright for end-to-end tests.

To run the unit tests:
    ```
    yarn test
    ```

To run the unit tests:
    ```
    yarn test:e2e
    ```

You can also run this command to see the tests execute in a browser:
    ```
    yarn playwright test --ui
    ```
