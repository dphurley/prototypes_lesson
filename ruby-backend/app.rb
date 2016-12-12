require 'sinatra'
require 'json'

get '/' do
  File.read('public/index.html')
end

get '/favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('favorites.json')
end

post '/addFavorite' do
  favorites = JSON.parse(File.read('favorites.json'))

  return 'Invalid Request' unless params[:movie_title] && params[:imdb_id]

  puts params[:movie_title]
  puts params[:imdb_id]

  new_favorite = { 
    'movie_title' => params[:movie_title], 
    'imdb_id' => params[:imdb_id] 
  }

  favorites['favorites'] << new_favorite
  File.write('favorites.json', JSON.pretty_generate(favorites))
  new_favorite.to_json
end
