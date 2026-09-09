# Facebook SDK for iOS setup

This guide describes how to add the Facebook SDK for iOS to an Xcode
application. The reference source is the `facebook-ios-sdk` repository
archive. Its Swift Package Manager manifest supports iOS 12 and exposes the
`FacebookCore`, `FacebookLogin`, `FacebookShare`, and
`FacebookGamingServices` products.

## Prerequisites

- Xcode with an iOS 12 (or later) deployment target
- A Facebook app created in [Meta for Developers](https://developers.facebook.com/apps/)
- The Facebook App ID
- The Client Token from **Settings > Advanced** in the Facebook app dashboard

## Add the package with Swift Package Manager

1. In Xcode, select **File > Add Package Dependencies**.
2. Enter `https://github.com/facebook/facebook-ios-sdk`.
3. Select a released version and add the products required by the app:
   - **FacebookCore** for SDK initialization and app events
   - **FacebookLogin** for Facebook Login
   - **FacebookShare** for sharing
   - **FacebookGamingServices** only when gaming services are needed
4. Link the selected products to the application target.

The SDK's package manifest also includes the `FacebookAEM` product. Add it
only when the app uses Aggregated Event Measurement directly.

## Configure `Info.plist`

Replace the placeholders below with values from the Facebook app dashboard:

```xml
<key>FacebookAppID</key>
<string>YOUR_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>YOUR_APP_NAME</string>

<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fbYOUR_APP_ID</string>
    </array>
  </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
  <string>fbapi</string>
  <string>fb-messenger-share-api</string>
  <string>fbauth2</string>
  <string>fbshareextension</string>
</array>
```

Do not commit real app credentials to a public repository. Keep production
values in the app's managed build configuration or secret store.

## Initialize the SDK

For a UIKit app, initialize the SDK in `AppDelegate`:

```swift
import FBSDKCoreKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        ApplicationDelegate.shared.application(
            application,
            didFinishLaunchingWithOptions: launchOptions
        )
        return true
    }
}
```

If the app uses scenes, forward URL callbacks from `SceneDelegate` so Login
and sharing can return to the app:

```swift
import FBSDKCoreKit

func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
        _ = ApplicationDelegate.shared.application(
            UIApplication.shared,
            open: context.url,
            sourceApplication: context.options.sourceApplication,
            annotation: context.options.annotation
        )
    }
}
```

For a SwiftUI app, use an `UIApplicationDelegate` adaptor and call the same
`ApplicationDelegate.shared.application` initialization method from the
adapted delegate.

## Verify the integration

1. Build the app on a simulator or device.
2. Confirm that the app launches without an SDK configuration error.
3. Test each enabled product, including the return path from Facebook Login
   or a share dialog.
4. Verify the app's privacy disclosures and consent flow. Facebook notes that
   SDK data collection may require disclosures in App Store Connect and in the
   app's privacy policy.

For product-specific configuration and current platform requirements, use the
[Facebook iOS getting started documentation](https://developers.facebook.com/docs/ios/getting-started).
