<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Music;

class MusicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Music::insert([
            'title' => 'Song One',
            'artist' => 'Artist One',
            'album' => 'Album One',
            'genre' => 'Pop',
            'release_year' => 2020,
            'track_number' => 1,
            'label' => 'Label One',
            'duration' => '03:45',
            'composer' => 'Composer One',
            'producer' => 'Producer One',
            'explicit_content' => false,
            'language' => 'English',
            'cover_image' => 'https://example.com/image1.jpg',
            'file_path' => '/music/song-one.mp3',
            'plays' => 1000,
        ],
        [
            'title' => 'Song Two',
            'artist' => 'Artist Two',
            'album' => 'Album Two',
            'genre' => 'Rock',
            'release_year' => 2018,
            'track_number' => 2,
            'label' => 'Label Two',
            'duration' => '04:20',
            'composer' => 'Composer Two',
            'producer' => 'Producer Two',
            'explicit_content' => true,
            'language' => 'English',
            'cover_image' => 'https://example.com/image2.jpg',
            'file_path' => '/music/song-two.mp3',
            'plays' => 2000,
        ],
        [
            'title' => 'Song Three',
            'artist' => 'Artist Three',
            'album' => 'Album Three',
            'genre' => 'Jazz',
            'release_year' => 2021,
            'track_number' => 3,
            'label' => 'Label Three',
            'duration' => '05:00',
            'composer' => 'Composer Three',
            'producer' => 'Producer Three',
            'explicit_content' => false,
            'language' => 'French',
            'cover_image' => 'https://example.com/image3.jpg',
            'file_path' => '/music/song-three.mp3',
            'plays' => 500,
        ]
    );

    }
    
}
