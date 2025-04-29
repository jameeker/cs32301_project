Project file structure
```
.
├── backend
│   ├── __pycache__
│   │   ├── app.cpython-312.pyc
│   │   └── config.cpython-312.pyc
│   ├── app.py
│   ├── blueprints
│   │   ├── __pycache__
│   │   │   ├── about.cpython-312.pyc
│   │   │   ├── bulletin_board.cpython-312.pyc
│   │   │   ├── community_stats.cpython-312.pyc
│   │   │   ├── how_to.cpython-312.pyc
│   │   │   └── personal_board.cpython-312.pyc
│   │   ├── about.py
│   │   ├── bulletin_board.py
│   │   ├── how_to.py
│   │   └── personal_board.py
│   ├── config.py
│   ├── create_system_user.py
│   ├── database
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-312.pyc
│   │   │   └── db.cpython-312.pyc
│   │   ├── database-migrations
│   │   │   ├── __pycache__
│   │   │   │   ├── 00-initial-schema.cpython-312.pyc
│   │   │   │   ├── 01-initial-indexes.cpython-312.pyc
│   │   │   │   ├── 02-adding-test-data.cpython-312.pyc
│   │   │   │   ├── 03-adding-test-default-prompts.cpython-312.pyc
│   │   │   │   └── 04-adding-supplemental-data.cpython-312.pyc
│   │   │   ├── 00-initial-schema.py
│   │   │   ├── 01-initial-indexes.py
│   │   │   ├── 02-adding-test-data.py
│   │   │   ├── 03-adding-test-default-prompts.py
│   │   │   └── 04-adding-supplemental-data.py
│   │   ├── db.py
│   │   ├── documentation
│   │   │   └── database-setup.md
│   │   ├── dumps
│   │   │   ├── Dump20250418.sql
│   │   │   └── full_backup_20250428.sql
│   │   ├── export_db.py
│   │   ├── exports
│   │   │   ├── Note_States_20250406_134217.csv
│   │   │   ├── note_states_20250406_234405.csv
│   │   │   ├── note_states_20250412_174450.csv
│   │   │   ├── note_states_20250412_210216.csv
│   │   │   ├── note_states_20250412_213518.csv
│   │   │   ├── note_states_20250418_222825.csv
│   │   │   ├── Note_States_20250428_014010.csv
│   │   │   ├── Notes_20250406_134217.csv
│   │   │   ├── notes_20250406_234405.csv
│   │   │   ├── notes_20250412_174450.csv
│   │   │   ├── notes_20250412_210216.csv
│   │   │   ├── notes_20250412_213518.csv
│   │   │   ├── notes_20250418_222825.csv
│   │   │   ├── Notes_20250428_014010.csv
│   │   │   ├── notes_with_states_20250406_134217.csv
│   │   │   ├── notes_with_states_20250406_234405.csv
│   │   │   ├── notes_with_states_20250412_174450.csv
│   │   │   ├── notes_with_states_20250412_210216.csv
│   │   │   ├── notes_with_states_20250412_213518.csv
│   │   │   ├── notes_with_states_20250418_222825.csv
│   │   │   ├── notes_with_states_20250428_014010.csv
│   │   │   ├── Users_20250406_134217.csv
│   │   │   ├── users_20250406_234405.csv
│   │   │   ├── users_20250412_174450.csv
│   │   │   ├── users_20250412_210216.csv
│   │   │   ├── users_20250412_213518.csv
│   │   │   ├── users_20250418_222825.csv
│   │   │   └── Users_20250428_014010.csv
│   │   ├── seed_test_data.py
│   │   ├── sql
│   │   │   ├── indexes.sql
│   │   │   └── schema.sql
│   │   ├── test_db_ops.py
│   │   └── test_db.py
│   ├── documentation
│   │   ├── bulletin_board_api.md
│   │   └── postman_collection.json
│   └── yoyo.ini
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── AboutPage-howto.png
│   │   ├── ClockStatsOverlayPage-howto.png
│   │   ├── favicon.ico
│   │   ├── grid.html
│   │   ├── home-icon.png
│   │   ├── how-to.html
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── pencil-icon.png
│   │   ├── PersonalBoard-howto.png
│   │   ├── robots.txt
│   │   ├── screenshot-example.png
│   │   ├── sticky-note.png
│   │   ├── trash-howto.png
│   │   ├── trash-page.png
│   │   ├── trash-page2.png
│   │   ├── trash.html
│   │   ├── trash2-howto.png
│   │   ├── trash2.html
│   │   └── zoom-icon.png
│   └── src
│       ├── app
│       │   ├── App.css
│       │   ├── App.js
│       │   └── logo.svg
│       ├── assets
│       │   ├── about1.jpg
│       │   ├── about2.jpg
│       │   ├── backgrounds
│       │   │   ├── 8148_Kent-State-Design-Innovation_10.jpg
│       │   │   ├── AdobeStock_1021573494.jpeg
│       │   │   ├── AdobeStock_1335743702.jpeg
│       │   │   ├── AdobeStock_1376412387.jpeg
│       │   │   ├── AdobeStock_1428359044.jpeg
│       │   │   ├── AdobeStock_912201011.jpeg
│       │   │   ├── background_fern.jpg
│       │   │   ├── background_grass.jpg
│       │   │   ├── background_trees.jpg
│       │   │   ├── background_white.jpg
│       │   │   ├── cloudy-day.webp
│       │   │   ├── full-bloom.webp
│       │   │   ├── geometry.webp
│       │   │   ├── home-icon.png
│       │   │   ├── light-veneer.webp
│       │   │   ├── pencil-icon.png
│       │   │   ├── pexels-dom-j-7304-310452.jpg
│       │   │   ├── pexels-jplenio-2259232.jpg
│       │   │   ├── pexels-padrinan-19670.jpg
│       │   │   ├── pexels-padrinan-255379.jpg
│       │   │   ├── pexels-pixabay-301717.jpg
│       │   │   ├── pexels-pixabay-326347.jpg
│       │   │   ├── pexels-steve-1269968.jpg
│       │   │   ├── pexels-timmossholder-936800.jpg
│       │   │   ├── seamless_paper_texture.webp
│       │   │   ├── sticky-note.png
│       │   │   └── zoom-icon.png
│       │   ├── ClosedBook.png
│       │   ├── logo_placeholder_512.png
│       │   └── OpenBook.png
│       ├── components
│       │   ├── ClockIcon
│       │   │   ├── ClockIcon.css
│       │   │   └── index.js
│       │   ├── HomeButton
│       │   │   ├── HomeButton.css
│       │   │   └── index.js
│       │   ├── index.js
│       │   ├── NavButtonBar
│       │   │   ├── index.js
│       │   │   └── NavButtonBar.css
│       │   └── UrlDisplay
│       │       ├── index.js
│       │       └── UrlDisplay.css
│       ├── index.css
│       ├── index.js
│       ├── pages
│       │   ├── index.js
│       │   ├── page_about
│       │   │   ├── about.css
│       │   │   ├── about.js
│       │   │   └── index.js
│       │   ├── page_bulletin_board
│       │   │   ├── bulletin_board.css
│       │   │   ├── bulletin_board.js
│       │   │   └── index.js
│       │   ├── page_clock_stats
│       │   │   ├── clock_stats.css
│       │   │   ├── clock_stats.js
│       │   │   └── index.js
│       │   ├── page_how_to
│       │   │   ├── AboutPage-howto.png
│       │   │   ├── ClockStatsOverlayPage-howto.png
│       │   │   ├── how_to.css
│       │   │   ├── how_to.js
│       │   │   ├── how-to.html
│       │   │   ├── index.js
│       │   │   ├── PersonalBoard-howto.png
│       │   │   ├── trash-howto.png
│       │   │   └── trash2-howto.png
│       │   ├── page_personal_board
│       │   │   ├── index.js
│       │   │   ├── personal_board.css
│       │   │   └── personal_board.js
│       │   ├── page_trash
│       │   │   ├── grid.html
│       │   │   ├── index.js
│       │   │   ├── trash-page.png
│       │   │   ├── trash-page2.png
│       │   │   ├── trash.css
│       │   │   ├── trash.html
│       │   │   ├── trash.js
│       │   │   └── trash2.html
│       │   ├── page_view_note
│       │   │   ├── index.js
│       │   │   ├── view_note.css
│       │   │   └── view_note.js
│       │   ├── page_view_note_personal
│       │   │   ├── index.js
│       │   │   ├── view_note_personal.css
│       │   │   └── view_note_personal.js
│       │   └── page_write_note
│       │       ├── index.js
│       │       ├── write_note.css
│       │       └── write_note.js
│       └── utils
│           └── utils.js
├── README
│   ├── README-db.md
│   ├── README-project-structure.md
│   └── README.ipynb
├── requirements.txt
├── tree_structure.txt
└── yoyo.ini

37 directories, 184 files
```
File tree created from this command:  
`tree -I 'node_modules|build|.git|.next|dist|coverage' -L 5 -o tree_structure.txt`

Note: try different `-L` level values to capture different files and subdirectories.
example: `tree -I 'node_modules|build|.git|.next|dist|coverage' -L 3 -o tree_structure.txt`