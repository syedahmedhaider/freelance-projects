package com.example.vexter;

import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private final int SPLASH_DISPLAY_LENGTH = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        new Handler().postDelayed(new Runnable(){
            @Override
            public void run() {
                /* Create an Intent that will start the Menu-Activity. */
//                Intent mainIntent = new Intent(MainActivity.this, LoginActivity.class);
//                MainActivity.this.startActivity(mainIntent);
//                MainActivity.this.finish();
                android.widget.Toast.makeText(context, "", Toast.LENGTH_SHORT).show();
            }
        }, SPLASH_DISPLAY_LENGTH);
    }
}
