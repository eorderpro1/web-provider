import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class SupabaseWebsocketService {
  private supabase: SupabaseClient;
  constructor() {
    // Initialize Supabase client
    this.supabase = createClient(
      'https://ulufshgjfsfzwvdxdwth.supabase.co', // Replace with your Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM' // Replace with your Supabase anon key
    );
  }

  // Subscribe to real-time updates
  subscribeToOrders(callback: (order: any) => void): void {
    const channel = this.supabase
      .channel('public:orders') // Replace 'orders' with your table name
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        callback(payload.new);
      })
      .subscribe();
  }

  // Send a message (e.g., order acceptance)
  acceptOrder(orderId: string): void {
    // Update the order status in Supabase (acts like sending a message)
    this.supabase
      .from('orders') // Replace with your table name
      .update({ is_draft: 'false' })
      .eq('id', orderId)
      .then((response) => {
        console.log('Order accepted:', response);
      });
  }
}
