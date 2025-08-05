import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [showUpdateProfileDialog, setShowUpdateProfileDialog] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-header">
        <Avatar>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Button onClick={() => setShowUpdateProfileDialog(true)}>Update Profile</Button>
      </div>
      <div className="profile-body">
        <AppliedJobTable />
        <UpdateProfileDialog
          isOpen={showUpdateProfileDialog}
          onClose={() => setShowUpdateProfileDialog(false)}
        />
      </div>
    </div>
  );
};

export default Profile;