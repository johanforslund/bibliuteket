package com.koma;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

// public class MainApplication extends Application implements ReactApplication {
public class MainApplication extends NavigationApplication {

  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   protected boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }
  //
  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //         new MainReactPackage()
  //     );
  //   }
  // };
  //
  // @Override
  // public ReactNativeHost getReactNativeHost() {
  //     return mReactNativeHost;
  // }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage()
    );
  }
}