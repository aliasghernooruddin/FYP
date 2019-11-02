import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};


@Injectable({
  providedIn: 'root'
})

export class TwitterAuthService {

  provider = new firebase.auth.TwitterAuthProvider();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,
    private toastr: ToastrService, private router: Router, private httpClient: HttpClient) {

  }

  TwitterLogin() {
    return this.oAuthLogin(this.provider).then(result => {
      let username = result.additionalUserInfo.username;
      username = username.toLowerCase()
      this.db.collection("TwitterData").ref.doc(username).get().then((doc) => {
        if (doc.exists) {
          this.toastr.info('Transferring you to your Dashboard', 'Already Registered');
          this.router.navigate(['/user', username])
        }
        else {
          this.db.collection("TwitterData").doc(username).set({
            name: result.user.displayName,
            email: result.user.email,
            profilePicture: result.user.photoURL,
            username: username,
            number: result.user.phoneNumber,
            description: result.additionalUserInfo.profile['description'],
            followers: result.additionalUserInfo.profile['followers_count'],
            following: result.additionalUserInfo.profile['friends_count'],
            location: result.additionalUserInfo.profile['location'],
            tweets: result.additionalUserInfo.profile['statuses_count']
          }).then(() => {
            this.toastr.success('Transferring to your Dashboard', 'Success');
            this.httpClient.get('http://localhost:5000/getTweets/' + username, httpOptions).subscribe(response => {
            })
            this.router.navigate(['/user', username])

          }).catch((error) => {
              this.toastr.error('Please try Again', "Error!!");

            });
        }
      })
    }).catch(error => {
      this.toastr.error('Please try Again later', "No Internet Connection");
      return "Done"
    })
  }


  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
