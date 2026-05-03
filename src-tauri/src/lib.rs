#[tauri::command]
fn calculate_date(full_year: bool, separator: String, reverse_order: bool, left_zero: bool) -> String {
    use chrono::{Datelike, Local};

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

#[tauri::command]
fn revert_julian_date(year: i32, julian_day: u32) -> Result<String, String> {
    use chrono::NaiveDate;

    let data: NaiveDate = NaiveDate::from_yo_opt(year, julian_day)
        .ok_or("Data juliana inválida")?;
    
    Ok(data.format("%d/%m/%Y").to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_date, revert_julian_date])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}