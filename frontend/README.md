## What's done

1. Refactored the code to populate the table fields through a Modal view instead of adding the rows in the table directly.
2. Created edit and delete buttons for each row in the table and added functionality to them.
3. Sorted the rows by latest tickets first in the table.
4. Create a functionality to sort the rows by Latest and Oldest tickets by the click of a button.
5. Date assigned done.

## Bugs and Issues

1. Very first time clicking the submit button, does not loads up the default values in the table. It works on the 2nd try.
2. The required attribute does not work in the input fields. It does not show the error message when the input fields are empty.
3. CSS needs to be fixed for the input fields in the modal window to show everything in 100% width.
4. Notes column should have username and date the note is added.
5. Multi line form modal window.

give max width to notes column,
truncate the notes column,

decrease the size of the header
delete/edit column -> action (heading)

site -> no editing capability -> done

- make search option

- sector also multiple select

- unique inc ticket

- edit INC ticket and site id will be read only

<!-- this feature will be developed later -->

- Same Site ID can have multiple INC Tickets
- Same INC Ticket cannot have multiple Site IDs
<!-- this feature will be developed later -->

<!-- TMO dallas rtwp main excel rows to update from dashboard details excel -->

B, Q, R, T, U

<!-- TMO dallas rtwp main excel rows to update from dashboard details excel -->

from the imported excel, check if TMO dallas excel has the same INC ticket, and if yes, then update Assigned group, assignee, date reassigned and pier status

if, can't find the INC ticket, then update PIER status to Closed

COLUMNS-
Q -> G

- if status is changed from open to closed, make resolution field mandatory.
- if resolution is filled once, and if user clicks edit, then the same should be mandatory and can't be left blank.
- make tech affected dropdown
