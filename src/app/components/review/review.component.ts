import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ReviewService } from '../../core/services/review.service';
import { ActivatedRoute } from '@angular/router';
import { IReview } from '../../models/ireview';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-review',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  sellerId!: number;
  reviews: IReview[] = [];
  isLoading = true;
  stars = [1, 2, 3, 4, 5];

  reviewForm!: FormGroup;
isSubmitting = false;
canReview = true; // يفترض أنك جايبه من API بناءً على حالة الأوردر

constructor(
  private fb: FormBuilder,
  private reviewService: ReviewService,
  private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.sellerId = +this.route.snapshot.paramMap.get('id')!;
  this.getReviews();
  this.initForm();
}

initForm(): void {
  this.reviewForm = this.fb.group({
    rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: [''],
    reviewerId: [1], // حط الـ ID الحقيقي من التوكن أو السيرفس
    sellerId: [this.sellerId],
    orderId: [123] // تحط الأوردر المرتبط بالمراجعة
  });
}

submitReview(): void {
  if (this.reviewForm.invalid) return;

  this.isSubmitting = true;

  this.reviewService.createReview(this.reviewForm.value).subscribe({
    next: () => {
      this.getReviews(); // إعادة تحميل الريفيوهات
      this.reviewForm.reset(); // تفريغ الفورم
      this.isSubmitting = false;
    },
    error: (err) => {
      console.error(err);
      this.isSubmitting = false;
    }
  });
    }
     getReviews(): void {
    this.reviewService.getReviewsBySellerId(this.sellerId).subscribe({
      next: (res) => {
        this.reviews = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  setRating(value: number): void {
    this.reviewForm.patchValue({ rating: value });
  }

 
}
  // constructor(
  //   private reviewService: ReviewService,
  //   private route: ActivatedRoute
  // ) {}

  // ngOnInit(): void {
  //   // sellerId من الـ Route
  //   this.sellerId = +this.route.snapshot.paramMap.get('id')!;
  //   this.getReviews();
  // }

 

