package com.example.mapdemo;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class RegisterActivity extends AppCompatActivity {

    String userChoosenTask;
    int TAKE_PHOTO_CODE = 0;
    int SELECT_FILE =1;
    ImageView userImage ;
    ImageView userImage1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        userImage = (ImageView) findViewById(R.id.imageView);
        userImage1 = (ImageView) findViewById(R.id.imageView1);
        ImageButton capture = (ImageButton) findViewById(R.id.imageButton);
        capture.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                final CharSequence[] items = { "Take Photo", "Choose from Gallery", "Cancel" };
                AlertDialog.Builder builder = new AlertDialog.Builder(RegisterActivity .this);
                builder.setTitle("Upload Photo!");
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int item) {
                        if (items[item].equals("Take Photo")) {
                            userChoosenTask = "Take Photo";
                            //Invoke camera
                            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                            startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);

                        } else if (items[item].equals("Choose from Gallery")) {
                            userChoosenTask = "Choose from Gallery";
                            //Invoke Gallery of image only
                            Intent intent = new Intent();
                            intent.setType("image/*");
                            intent.setAction(Intent.ACTION_GET_CONTENT);//
                            startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
                        } else if (items[item].equals("Cancel")) {
                            dialog.dismiss();
                        }
                    }
                });
                AlertDialog builder1 = builder.create();
                builder1.show();
            }
        });
        ImageButton capture1 = (ImageButton) findViewById(R.id.imageButton1);
        capture1.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                final CharSequence[] items = { "Take Photo", "Choose from Gallery", "Cancel" };
                AlertDialog.Builder builder = new AlertDialog.Builder(RegisterActivity .this);
                builder.setTitle("Upload Photo!");
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int item) {
                        if (items[item].equals("Take Photo")) {
                            userChoosenTask = "Take Photo";
                            //Invoke camera
                            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                            startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);

                        } else if (items[item].equals("Choose from Gallery")) {
                            userChoosenTask = "Choose from Gallery";
                            //Invoke Gallery of image only
                            Intent intent = new Intent();
                            intent.setType("image/*");
                            intent.setAction(Intent.ACTION_GET_CONTENT);//
                            startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
                        } else if (items[item].equals("Cancel")) {
                            dialog.dismiss();
                        }
                    }
                });
                AlertDialog builder1 = builder.create();
                builder1.show();
            }
        });
    }



    Bitmap photo = null;
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK && data != null) {
            photo = (Bitmap) data.getExtras().get("data");
            userImage.setImageBitmap(photo);
            //userImage1.setImageBitmap(photo);
            Log.d("CameraDemo", "Pic saved");
        }else if(requestCode == SELECT_FILE && resultCode == RESULT_OK && data != null){
            try {
                photo = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());
                userImage.setImageBitmap(photo);
                //userImage1.setImageBitmap(photo);
            }catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void redirectToHome(View v){
        Intent redirect = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(redirect);
    }

    public void registerData(View v)
    {
        //This code redirects the from Register page to the login page.
        Intent redirect = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(redirect);
    }

}
