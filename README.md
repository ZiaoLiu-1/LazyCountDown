
  # Countdown Timer Prototype

  This is a code bundle for Countdown Timer Prototype. The original project is available at https://www.figma.com/design/0DnLnqpzs2S16Eaf4qGa3z/Countdown-Timer-Prototype.

  ## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Building for Capacitor

1. Generate the production web bundle that Capacitor will serve:

   ```bash
   npm run build
   ```

2. Initialize Capacitor (only required the first time):

   ```bash
   npm run cap:init
   ```

   This creates the Capacitor configuration with `build/` as the web directory.

3. Add the iOS project and copy the web build into it:

   ```bash
   npm run cap:add:ios
   npm run cap:sync
   ```

4. Open the generated Xcode workspace under `ios/` to run the WebView container on an iOS device or simulator.

If any of the Capacitor CLI commands fail because the packages are not yet installed, run `npm install` first to download `@capacitor/cli`, `@capacitor/core`, and `@capacitor/ios`.
  