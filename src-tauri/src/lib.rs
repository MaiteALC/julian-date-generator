use chrono::{Datelike, Local};

#[tauri::command]
fn calculate_date(full_year: bool, separator: String, reverse_order: bool, left_zero: bool) -> String {
    let now: chrono::DateTime<Local> = Local::now();

    let year: String = if full_year { 
        now.year().to_string() 
    } else { 
        (now.year() % 100).to_string() 
    };

    let ordinal_day: String = if left_zero { 
        format!("{:03}", now.ordinal()) 
    } else { 
        now.ordinal().to_string() 
    };

    if reverse_order { 
        format!("{}{}{}", year, separator, ordinal_day) 
    } else { 
        format!("{}{}{}", ordinal_day, separator, year) 
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![calculate_date])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}