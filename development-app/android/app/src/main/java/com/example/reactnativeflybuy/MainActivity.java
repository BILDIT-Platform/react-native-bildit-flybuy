package com.example.reactnativeflybuy;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativeflybuy.FlybuyModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FlybuyExample";
  }


  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    handleFlyBuyIntent(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    handleFlyBuyIntent(intent);
  }

  public void handleFlyBuyIntent(Intent intent) {
    FlybuyModule flybuyModule = new FlybuyModule((ReactApplicationContext) getApplicationContext());
    flybuyModule.handleNotification(intent);
  }
}
