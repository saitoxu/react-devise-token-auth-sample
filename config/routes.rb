Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', defaults: { format: "json" }

  namespace :api, defaults: { format: :json } do
    resources :notes, only: [:index, :show, :update, :create, :destroy]
  end

  get '/confirm_success' => 'home#confirm_success'
  get '/notes' => 'home#index'
  get '/notes/new' => 'home#index'
  get '/notes/:id/edit' => 'home#index'
  get '/notes/:id' => 'home#index'
  get '/signup' => 'home#index'
  get '/login' => 'home#index'
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
