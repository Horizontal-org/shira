import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ManageSubscriptionDto } from '../dto/manage-subscription.dto';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';

@Injectable()
export class ShiraPaymentsService {
  private readonly baseUrl = 'http://localhost:3001';
  private readonly apiKey = 'mock-internal-shira-key';

  constructor(private readonly httpService: HttpService) { }

  private get headers() {
    return { 'x-internal-shira-key': this.apiKey };
  }

  async manageSubscription(dto: ManageSubscriptionDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/manage-subscription`, dto, {
        headers: this.headers,
      }),
    );
    return data;
  }

  async createCheckout(dto: CreateCheckoutDto) {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/create-checkout`, dto, {
        headers: this.headers,
      }),
    );
    return data;
  }
}
