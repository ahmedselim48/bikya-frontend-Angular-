import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview, ICreateReview, IUpdateReview } from '../../models/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 private baseUrl = 'https://localhost:65162/api/Reviews'; 

  constructor(private http: HttpClient) {}

  //  Get all reviews for a seller 
  getReviewsBySellerId(sellerId: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.baseUrl}/Seller/${sellerId}`);
  }

  //  Create a review
  createReview(review: ICreateReview): Observable<IReview> {
    return this.http.post<IReview>(this.baseUrl, review);
  }

  //  Update a review
  updateReview(review: IUpdateReview): Observable<IReview> {
    return this.http.put<IReview>(`${this.baseUrl}/${review.id}`, review);
  }

  //  Delete review
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}`);
  }

  //  Get single review 
  getReviewById(id: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.baseUrl}/${id}`);
  }
 
}
