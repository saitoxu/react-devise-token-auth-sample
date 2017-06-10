Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', defaults: { format: "json" }

  resources :notes, only: [:index, :show, :update, :create, :destroy]

  get '/confirm_success' => 'home#confirm_success'
  get '/signup' => 'home#index'
  get '/login' => 'home#index'
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
